import '../css/mainContent.css'; 

export default function Prayer(props) {
    return (
        <>  
        <div className="col-xxl col-lg-4 col-md-6 col-sm-12 margin-auto">
            <div className="card my-4 " style={{border:'1px solid rgb(185, 148, 114)'}}>
                <div style={{height:'200px'}}>
                <img src={props.image} className="card-img-top h-100" alt="image mosque"  />
                </div>
                <div className="card-body text-end" style={{fontFamily:'Beiruti' , display:'flex' ,justifyContent:'space-between' ,alignItems:'center'}}>
                    <h3 className="card-title" style={{color:'rgb(185, 148, 114)'}}>{props.name}</h3>
                    <h5 className="card-text " style={{color:'rgb(0, 119, 136)'}}>{props.time}</h5>
                </div>
            </div>
        </div>
        </>
        ); 
}

