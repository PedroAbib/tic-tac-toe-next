import { IBoxState } from "../../types/box-state";
import { IPlayerValue } from "../../types/player-value";
import { IWrapperState } from "../../types/wrapper-state";


export function ticTacJudge(list: IWrapperState, playerValue: IPlayerValue): boolean {
  const totalPlaysByPlayer = list.filter((value) => value == playerValue)

  if (totalPlaysByPlayer.length < 3) {
    return false;
  }

  const diagonalResult = findDiagonal(list, playerValue)
  const horizontalResult = findHorizontal(list, playerValue)
  const verticalResult = findVertical(list, playerValue);

  return  diagonalResult || horizontalResult || verticalResult;
}

function findHorizontal(list: IWrapperState, playerValue: IPlayerValue): boolean {
  for (let i = 0; i < list.length; i += 3) {
    if (list[i] === playerValue && list[i + 1] === playerValue && list[i + 2] === playerValue) {
      return true;
    }
  }
  return false;
}


function findVertical(list: IWrapperState, playerValue: IPlayerValue): boolean {
  for (let i = 0; i < 3; i++) {
    if (list[i] === playerValue && list[i + 3] === playerValue && list[i + 6] === playerValue) {
      return true;
    }
  }
  return false;
}


function findDiagonal(list: IWrapperState, playerValue: IPlayerValue): boolean {
  const firstDiagonal = list[0] === list[4] && list[0] === list[8]
  const secondDiagonal = list[2] == list[4] && list[2] === list[6]

  if (firstDiagonal || secondDiagonal) return true

  return false;
}