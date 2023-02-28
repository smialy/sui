import { Paper } from '../paper/paper';

const styles = {
    root: 'card',
    body: 'card-body',
    title: 'card-title',
    header: 'card-header',
    text: 'card-text',
    footer: 'card-footer',
    media: 'card-img',
}

export const Card = ({ children }) => (
    <Paper className={styles.root}>
        {children}
    </Paper>
);
Card.displayName = 'Card';

const Body = ({ children }) => (
    <div className={styles.body}>{children}</div>
);
Body.displayName = 'Card.Body';

const Title = ({ children }) => (
    <h5 className={styles.title}>{children}</h5>
);
Title.displayName = 'Card.Title';

const Text = ({ children }) => (
    <p className={styles.text}>{children}</p>
);
Text.displayName = 'Card.Text';

const Media = ({ children }) => (
    <div className={styles.media}>{children}</div>
);
Media.displayName = 'Card.Media';

const Header = ({ children }) => (
    <div className={styles.header}>{children}</div>
);
Header.displayName = 'Card.Header';

const Footer = ({ children }) => (
    <div className={styles.footer}>{children}</div>
);
Footer.displayName = 'Card.Footer';

Card.Body = Body;
Card.Header = Header;
Card.Title = Title;
Card.Text = Text;
Card.Media = Media;
Card.Footer = Footer;