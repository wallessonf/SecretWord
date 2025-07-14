import Button from "./Button";
import "./GamerOver.css";

const GameOver = ({ retry, score }) => {
  return (
    <div className="end">
      <h1>Fim de Jogo</h1>
      <h2>A sua Pontuação foi: <span>{score}</span></h2>
      <p>Não desista, tente novamente!</p>
      <Button type="button" onClick={retry}>Resetar Jogo</Button>
    </div>
  );
};

export default GameOver;