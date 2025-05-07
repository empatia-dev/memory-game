type Props = {
    handleClick: () => void;
    symbol: string;
};

function Button({ handleClick, symbol } : Props) {
    return  <div className='button add-button' onClick={handleClick}>{symbol}</div>;
       
}

export default Button;