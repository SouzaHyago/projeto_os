import './status.css'
import Card from './components/Cards';

function status(){

    return(

    <div className='tags'>

        <Card 
            nome="Kizzi"
            codigo= "152248"
            css= "retirada"
            status= "retirada"
        />
        
        <Card 
            nome="Lucas"
            codigo= "1558648"
            css= "avaliacao"
            status= "avaliacao"
        />
        <br/>
        <Card 
            nome="Maria"
            codigo= "1328648"
            css= "confirmacao"
            status= "confirmacao"
        />
        
        <Card 
            nome="Maria"
            codigo= "1328648"
            css= "andamento"
            status= "andamento"
        />


    </div>    
        


      
    )
}
 export default status;