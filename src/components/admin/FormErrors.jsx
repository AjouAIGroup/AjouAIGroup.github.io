// Lists every problem with the form next to its save button, so a long form
// never stops on a general message whose cause sits off screen.
function FormErrors({ message, errors = {} }) {
    const details = [...new Set(Object.values(errors))].filter(
        (detail) => detail && detail !== message,
    );
    return (
        <div className="admin-editor__alert" role="alert">
            <p>{message}</p>
            {details.length ? (
                <ul className="admin-editor__alert-list">
                    {details.map((detail) => (
                        <li key={detail}>{detail}</li>
                    ))}
                </ul>
            ) : null}
        </div>
    );
}

export default FormErrors;
