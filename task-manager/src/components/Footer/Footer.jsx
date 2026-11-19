export default function Footer(){
    return (
        <footer style={{
            width: '100%',
            padding: '18px var(--page-padding)',
            backgroundColor: 'var(--surface)',
            borderTop: '1px solid var(--border)',
            color: 'var(--text-secondary)',
            textAlign: 'center',
            fontSize: '13px'
        }}>
            <p>&copy; {new Date().getFullYear()} TaskFlow by Axiome. All Rights Reserved.</p>
        </footer>
    );
}