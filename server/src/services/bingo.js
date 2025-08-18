import { randomUUID } from 'node:crypto';

// Rangos estándar B I N G O
const RANGES = {
  0: [1, 15],   // B
  1: [16, 30],  // I
  2: [31, 45],  // N
  3: [46, 60],  // G
  4: [61, 75]   // O
};

export function generateCard(){
  const cells = [];
  for(let col=0; col<5; col++){
    const [min, max] = RANGES[col];
    const pool = Array.from({length: max-min+1}, (_,i)=>min+i);
    // tomar 5 números únicos por columna; en la columna N (col=2) quitamos el centro
    shuffle(pool);
    for(let row=0; row<5; row++){
      if(col===2 && row===2) continue; // centro libre
      cells.push({ col, value: pool[row] });
    }
  }
  return { code: randomUUID(), cells };
}

export function shuffle(arr){
  for(let i=arr.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]]=[arr[j],arr[i]];
  }
  return arr;
}

export function checkBingo(card, drawnNumbers){
  // Construye matriz 5x5 de booleans, con centro libre true
  const grid = Array.from({length:5},()=>Array(5).fill(false));
  // colocar celdas
  let idx=0;
  for(let col=0; col<5; col++){
    for(let row=0; row<5; row++){
      if(col===2 && row===2){ grid[row][col]=true; continue; }
      const val = card.cells[idx++].value;
      grid[row][col] = drawnNumbers.includes(val);
    }
  }
  // líneas horizontales
  for(let r=0;r<5;r++) if(grid[r].every(Boolean)) return true;
  // verticales
  for(let c=0;c<5;c++) if([0,1,2,3,4].every(r=>grid[r][c])) return true;
  // diagonales
  if([0,1,2,3,4].every(i=>grid[i][i])) return true;
  if([0,1,2,3,4].every(i=>grid[i][4-i])) return true;
  return false;
}