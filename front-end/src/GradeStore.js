import {EventEmitter} from 'fbemitter'
const SERVER='http://localhost:8080'

class GradeStore{
    constructor(){
        this.data=[]
        this.emitter=new EventEmitter()
    }

    async getAll(){
        try{
            const response=await fetch(`${SERVER}/grades`)
            const data=await response.json()
            this.data=data
            //cum afla ceilalti ca am date noi?=>eventEmitter=>folosesc unul preexistent=>adaug o noua dependenta npm i fbemitter --save

            this.emitter.emit("GET_GRADES_SUCCES")
        }catch(err){
            console.warn(err)
            
            this.emitter.emit("GET_GRADES_ERR")
        }
    }

    async addOne(grade){
        //met async=>try/catch
     try{
        await fetch(`${SERVER}/grades`,{
        method:'post',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(grade)
    })
//daca un alt ut a mai adaugat o persoana?
    this.getAll();

//this.emitter.emit('ADD_PERSON_SUCCES')

        }catch(err){
            console.warn(err)
            this.emitter.emit('ADD_GRADE_ERROR')
        }
}
}

const store=new GradeStore()

export default store//toata lumea are acces la acelasi store care contine o serie de metode ce interactioneaza cu serverul
