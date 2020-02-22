//Gurps
import * as repl from "repl";
import * as fs from "fs";
import * as process from "process";
import * as calc from "./calc";
import * as path from "path";
import * as inquirer from "inquirer"

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



class Player{
    ST:number;
    DX:number;
    IQ:number;
    HT:number;  
    hp:number;
    will:number;
    per:number;
    fp:number;
    traits:[DataRef];
    items:[DataRef];
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

class DataCard {
    tx:string;
    select:string[];
    cost:number;
    level?:number;
    tags:string[];
}

class DataRef{
    name:string;
    cost:number;
    num:number;
}

function load_data(fpath:string):any{
    let f_ref = (s:string)=>path.join(process.cwd(),s);
    let d1 = fs.readFileSync(f_ref(fpath),'UTF-8');
    return JSON.parse(d1);
}


async function build_character(loc:any,name:string):Promise<Player>{
    let r = await inquirer.prompt([
        {name:"strength",type:"number",message:"What is your strength?"}
    ]);
    loc[name] = new Player(r.strength as number);
    return loc[name];

}

//build_character()//.then((s)=>console.log(s));


async function run():Promise<number>{ 
    let dat = load_data("data/advantages.json");
    let ss = "";
    while(true){
        let p = await inquirer.prompt([
            {name:"job",type:"input",message:">>"}
        ]);
        let s = p.job as string;
        if (s.slice(-1) == '\\') {
            ss = ss+ s.slice(0,-1);
        }else {
            s = ss + s;
            ss = "";

            try {
                let v = await eval(s);
                console.log(v);
            }catch(e) {
                console.log(e);
            }
        }
    }
}

run();
    /*
async function run(){
    let dat = load_data("data/advantages.json");
 
    await repl.start("-->").context.c = {
        args:process.argv,
        dat:dat,
        players:{},
        npcs:{},
        b_char:build_character,
        td:calc.thrust_dmg,
        sd:calc.swing_dmg,
    };
    done = true;
}

run();

    */



