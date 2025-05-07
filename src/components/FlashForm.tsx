import { useState } from "react";
import Button from "./Button";
import AlertDialog from "./AlertDialog";

type Props = {
    changeEmojis: (emojis: string) => void;
    hideForm: () => void;
    text: string;
}



function FlashForm({ changeEmojis, hideForm, text } : Props) {
    const [value, setValue] = useState(text);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState('');

    function hideAlert() {
        setShowAlert(false);
    }

    function alert(msg: string) {
        setAlertMsg(msg);
        setShowAlert(true);
    }

    const removeModifiers = (str: string) =>
        Array.from(str)
          .filter(char => char !== '\uFE0F' && char.trim() !== "")
          .join('');

    // only trigger changes if the emojis change,
    // block duplicate emojis and set a max of 14.
    // also filter the input to remove empty spaces.
    function handleSubmit() {
        const cleanedValue = removeModifiers(value);

        const emojis = Array.from(cleanedValue).filter((char) =>
            /\p{Extended_Pictographic}/u.test(char)
        );
        
        const cleaned = emojis.join('');
        const hasInvalidCharacters = cleanedValue !== cleaned;
        const hasDuplicates = new Set(emojis).size !== emojis.length;
        
        if (hasInvalidCharacters) {
            alert("Please use only emojis — no text or symbols.");
        } else if (hasDuplicates) {
            alert("You have duplicate emojis. Please remove the duplicates and try again.");
        } else if (emojis.length > 14) {
            alert("You can use up to 14 emojis. Please remove the extras and try again.");
        } else if (cleaned === text) {
            hideForm();
        } else {
            changeEmojis(cleaned);
        }
    }
    

    return <div className='ui-container'>
        <div className='flash-form'>
            <h2>Change the emojis</h2>
            <div className='form-row'>
                <textarea
                    id="answer" name="answer"
                    onChange={(event) => {
                        const emojis = event.target.value;
                        const emojiCount = Array.from(emojis).length;
                        if (emojiCount <= 14) {
                            setValue(emojis);
                        }
                    }}
                    value={value}>
                </textarea>
            </div>
            <Button
            symbol={"✓"}
            handleClick={handleSubmit}
            // 
            />
        </div>
        {showAlert && <AlertDialog
            msg={alertMsg}
            hideAlert={hideAlert}
         />}
    </div>;
}

export default FlashForm;