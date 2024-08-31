'use client'

import { useEffect, useState } from "react";
import { IPlayerValue } from "../../types/player-value";
import Box from "../box/box";
import { IWrapperState } from "../../types/wrapper-state";
import { ticTacJudge } from "./tic-tac-judge";


type IWrapper = {

}

const initialState: IWrapperState = [
  "", "", "",
  "", "", "",
  "", "", ""
]


export default function Wrapper() {
  const [wrapperStateList, setWrapperStateList] = useState<IWrapperState>(initialState);
  const [playCount, setPlayCount] = useState<number>(0);
  const [gameFinished, setGameFinished] = useState<boolean>(false);
  const [hasWinner, setHasWinner] = useState<boolean>(false);
  const [finalMessage, setFinalMessage] = useState<string>('')
  const [lastPlayed, setLastPlayed] = useState<string>();

    useEffect(() => {
      if (playCount === 9) {
        setGameFinished(true)
      }

      if (gameFinished) {
        createFinalMessage()
        resetWrapperState()
      }
    }, [wrapperStateList, gameFinished, playCount])


    function makePlay(newState: IPlayerValue, index: number) {
      if (gameFinished) {
        return;
      }

      const copyState = Array.from(wrapperStateList);
      copyState[index] = newState
      setWrapperStateList(copyState)
      setLastPlayed(newState)
      incrementPlayerCount()

      if (ticTacJudge(copyState, newState)) {
        setHasWinner(true)
        setGameFinished(true)
      }
    }

    function resetWrapperState() {
      setTimeout(() => {
        setPlayCount(0)
        setHasWinner(false)
        setFinalMessage("")
        setGameFinished(false);
        setWrapperStateList(initialState);
      }, 1500)
    }

    function resolvePlayerValue() {
      if (playCount % 2 == 0) {
        return "X"
      } else {
        return "O"
      }
    }

    function createFinalMessage() {
      if (hasWinner) {
        setFinalMessage(`O vencedor foi ${lastPlayed}!`)
      } else {
        setFinalMessage('Burros, empataram a porra do jogo!')
      }
    }

    function incrementPlayerCount() {
      const playCountValue = playCount
      setPlayCount(playCountValue + 1)
    }

    return(
      <div>
          <div className="grid grid-cols-3 grid-rows-3 gap-4">
        {wrapperStateList.map((wrapperState, index) => (
          <Box getPlayerValue={resolvePlayerValue} state={wrapperState} update={makePlay} index={index}/>
        ))}
        </div>
        { gameFinished ? <h1>{ finalMessage}</h1> : <></>}
      </div>
    )
}