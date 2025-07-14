import Button from "./Button"
import './StartScreen.css'

const StartScreen = ({ startGame }) => {
  return (
    <div className="start">
        <h1>Secret Word</h1>
        <p>Clique no botão abaixo para começar a jogar</p>
        <Button onClick={startGame}>Comecar o jogo</Button>
        
    </div>
  )
}

export default StartScreen