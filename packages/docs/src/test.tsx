import { useSignal, useComputed, effect } from "@preact/signals";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "preact/hooks";

export default function Test() {
    return (
        <>
          <Counter />
            {/* <Form /> */}
            {/* <ToUseUseCallback className="counterApp" />
            <ToUseUseEventCallback className="counterApp" /> */}
        </>
    );
}


function Counter() {
  const user = useSignal(null);
  const isLogin = useComputed(() => !!user.value);

  const loginHandler = () => {
    user.value = {
      id: 'a',
      name: 'John',
    };
  };
  const logoutHandler = () => {
    user.value = null;
  }
  effect(() => console.log(user.value));

  return (
    <div>
      {!isLogin.value && <button onClick={loginHandler}>Login</button>}
      {isLogin.value && <button onClick={logoutHandler}>Logout</button>}
      {isLogin.value && <div>Hi {user.value.name}</div>}
    </div>
  );
}


function Form() {
    const [text, updateText] = useState('');
    const textRef = useRef('');
    useEffect(() => {
      textRef.current = text;
    });
    const handleSubmit = useCallback(() => {

      const currentText = textRef.current; // Read it from the ref    alert(currentText);
    }, [textRef]); // Don't recreate handleSubmit like [text] would do

    return (
      <>
        <input value={text} onChange={e => updateText('a')} />
        <button onClick={handleSubmit}>Submit</button>
      </>
    );
  }

function ToUseUseCallback({ ...rest }) {
    const [count, setCount] = useState(0);
    const [clickCount, setClickCount] = useState(0);

    const onIncrement = useCallback(() => {
        setCount((count) => count + 1);
        setClickCount(clickCount + 1);
    }, []);

    const onDecrement = () => {
        setClickCount(clickCount + 1);
        setCount((count) => count - 1);
    };

    return (
        <div className="ToUseUseCallback" {...rest}>
            <h1 className="counterName">
                <span className="to-use">To use</span>
                <br />
                <u>useCallback</u>
            </h1>
            <h2>Count: {count}</h2>
            <h2>Total: {clickCount}</h2>

            <button onClick={onIncrement}>INCREMENT</button>
            <button onClick={onDecrement}>DECREMENT</button>
        </div>
    );
}

export function ToUseUseEventCallback({ ...rest }) {
    const [count, setCount] = useState(0)
    const [clickCount, setClickCount] = useState(0)

    const onIncrement = useEventCallback(event => {
        setCount(count => count + 1)
        setClickCount(clickCount + 1)
    }, [])

    const onDecrement = useEventCallback(event => {
        setCount(count => count - 1)
        setClickCount(clickCount + 1)
    }, [])
    return (
        <div className="ToUseUseCallback" {...rest}>
            <h1 className="counterName">
                <span className="to-use">To use</span>
                <br />
                <u>useEventCallback</u>
            </h1>
            <h2>Count: {count}</h2>
            <h2>Total: {clickCount}</h2>

            <button onClick={onIncrement}>INCREMENT</button>
            <button onClick={onDecrement}>DECREMENT</button>
        </div>
    )
}

const useEventCallbackBase = (useEffectHook, fn, deps) => {
    const ref = useRef(fn)

    useEffectHook(
      () => {
        ref.current = fn
      },
      [fn, ...deps]
    )

    return useCallback(
      (...args) => {
        const callback = ref.current
        callback(...args)
      },
      [ref]
    )
  }

  export const useEventCallback = useEventCallbackBase.bind(null, useLayoutEffect)
