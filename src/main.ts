//Gurps
import * as repl from "repl";
import * as fs from "fs";
import * as process from "process";
import * as calc from "./calc";

interface Costed{    
    cost:number;
    name:String;
    tx:String;
}

class Data{
    weapons:{[x:string]:Costed};
    items:{[x:string]:Costed};
    skills:{[x:string]:Costed};
    traits:{[x:string]:Costed};
    constructor(){
        this.weapons = {}; 
        this.items = {}; 
        this.skills = {}; 
        this.traits = {}; 
    }

}

let dt = new Data();


class Player{
    ST:number;
    DX:number;
    IQ:number;
    HT:number;  
    hp:number;
    will:number;
    per:number;
    fp:number;
    thrust_dmg():string{
        return calc.thrust_dmg(this.ST);
    };
    swing_dmg():string{
        return calc.swing_dmg(this.ST);
    }


    constructor(st:number){
        this.ST = st;
        this.DX = st;
        this.IQ = st;
        this.HT = st;
        this.hp = st;
        this.will = st;
        this.per = st;
        this.fp = st;
    }

}


repl.start("-->").context.c = {
    args:process.argv,
    dat:dt,
    players:{},
    npcs:{},
    build:(n:number)=>new Player(n),
    td:calc.thrust_dmg,
    sd:calc.swing_dmg,
};
