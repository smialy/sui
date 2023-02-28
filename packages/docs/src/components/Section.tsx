type SectionProps = {
    title?: string;
    children?: any;
}

export const Section = ({ title, children }: SectionProps) => {
    return (
        <div className="section">
            {title && (
                <div class="section-title">{title}</div>
            )}
            <div class="section-body">
                {children}
            </div>
        </div>
    );
}