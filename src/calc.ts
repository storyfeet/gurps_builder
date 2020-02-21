
export function mod_str(n:number):string{
    if (n > 0) {
        return "+" + n;
    }
    if (n == 0){
        return "";
    }
    return n.toString();
};

export function thrust_dmg(st:number):string{
    let ndice = 1;
    let mod = Math.floor(((st-1)%18)/2) -6;
    if ( st > 18 ){
        ndice = 2+ Math.floor((st-19)/8);
        mod = Math.floor(((st-19)%8) /2)-1;
    }
    return `${ndice}d${mod_str(mod)}`;
};
export function swing_dmg(st:number):string{
    let ndice = 1; 
    let mod = Math.floor((st-1)/2) - 5;
    if (st >= 9){
        ndice += Math.floor((st-9)/4);
        mod = ((st-9)%4) -1;
    }
    return `${ndice}d${mod_str(mod)}`;
};
