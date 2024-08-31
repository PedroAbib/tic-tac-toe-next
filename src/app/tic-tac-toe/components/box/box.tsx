"use client"

import { useState } from "react"
import { IBoxState } from "../../types/box-state";
import { IPlayerValue } from "../../types/player-value";

export type IBox = {
    state: IBoxState;
    getPlayerValue: Function
    index: number
    update: Function
}

export default function Box({ getPlayerValue, state, update, index }: IBox) {

  function setDisplayValue() {
    if (state === "") {
      const playerValue = getPlayerValue()
      update(playerValue, index)
    }
  }

  return(
    <button className="w-36 h-36 bg-white flex items-center justify-center border" onClick={setDisplayValue}>
      <span className="text-black text-8xl">{state}</span>
    </button>
  )
}