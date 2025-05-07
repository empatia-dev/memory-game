import Button from "./Button";

type Props = {
    hideAlert: () => void;
    msg: string;
}

function AlertDialog({ hideAlert, msg }: Props) {
    return <div className='ui-container'>
        <div className='alert-dialog'>
            <h2>Alert</h2>
            <p>{msg}</p>
            <div className='button-container'>
                <Button
                symbol={"OK"}
                handleClick={hideAlert}
                />
            </div>
        </div>
    </div>;
}

export default AlertDialog;