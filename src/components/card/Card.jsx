import "./Card.css"
import qm from '../../assets/question-mark.png'

export default function Card({card, handleClick}) {
    return (
        <div className={"card " + (card.isFlipped ? 'flipped' : '')} onClick={() => handleClick(card)}>
            <div className="card-inner">
                <div className="card-front">
                    <img src={qm} className="image"/>
                </div>
                <div className="card-back">
                    <img src={card.url} className={"image"}/>
                </div>
            </div>
        </div>
    )
}