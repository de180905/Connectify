import {useState } from 'react'
import Picker from '@emoji-mart/react'; // Import Picker from emoji-mart
import data from '@emoji-mart/data'; // Import emoji data
const EmojiPicker = ({ onSelect }) => {
    const [showPicker, setShowPicker] = useState(false);
    const togglePicker = () => {
        setShowPicker((prev) => !prev);
    };
    return (
        <div style={{
            position: 'absolute',
            bottom: '10px',
            right: '10px',
        }}>
            <button
                onClick={togglePicker}
                style={{
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                }}
            >
                😊
            </button>
            {showPicker && (
                <div style={{ position: 'absolute', top: '15px', right: '10px' }}>
                    <Picker
                        data={data} // Pass the emoji data
                        onEmojiSelect={(emoji) => {
                            onSelect(emoji);
                            setShowPicker(false);
                        }} 
                    />
                </div>
            )}
        </div>
    )
}
export default EmojiPicker