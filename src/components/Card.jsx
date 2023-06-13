
const Card = ({id,title}) => {
   return (
      <div className="card">
  
  <div className="card-content">
    <div className="media">
     
      <div className="media-content">
        <p className="title is-4">Caso#{id} - {title}</p>
        <p className="subtitle is-6">@johnsmith</p>
      </div>
    </div>

    <div className="content">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Phasellus nec iaculis mauris. <a>@bulmaio</a>.
      <a href="#">#css</a> <a href="#">#responsive</a>
      <time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>
    </div>
  </div>
</div>
      
   )
   }
   

export default Card;