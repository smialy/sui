import styles from './icon.css';

enum Sizes {
    small = '10px',
    medium = '16px',
    large = '24px',
    xlarge = '32px'
}

type IconProps = {
    name: string,
    size: Sizes | number,
}

export const Icon = ({ name, size }: IconProps) => {
    size = Sizes[size||'small'] || size;
    const style = {
      width: size,
      height: size,
    };
    return (
        <svg className={styles.icon} style={style} viewBox="0 0 32 32">
          <use xlinkHref={`#${name}`}></use>
        </svg>
    );
}

export const getIcon = (name, size) => {
    if (typeof name === 'string') {
      return <Icon name={name} size={size} />
    }
    return name;
}