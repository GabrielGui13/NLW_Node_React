import copyImg from '../assets/images/copy.svg'
import '../styles/roomcode.scss'

type RoomCodeProps = {
    link: string;
    code: string;
}

export function RoomCode(props: RoomCodeProps) {
    
    function copyRoomCodeToClipboard() {
        navigator.clipboard.writeText(props.link)
    }

    return (
        <button className="room-code" onClick={copyRoomCodeToClipboard}>
            <div>
                <img src={copyImg} alt="Copiar" />
            </div>
            <span>Sala #{props.code}</span>
        </button>
    )
}