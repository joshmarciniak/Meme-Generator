import React, {Component} from "react"
import "./../index.css"

class MemeGenerator extends Component{
  constructor(){
    super()
    this.state = {
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg",
        allMemeImgs: []
    }
    this.changeHandler = this.changeHandler.bind(this)
    this.genHandler = this.genHandler.bind(this)
  }

  componentDidMount(){
    fetch("https://api.imgflip.com/get_memes")
    .then(response => response.json())
    .then(response => {
      const {memes} = response.data
      this.setState({allMemeImgs: memes})
    })
  }

  changeHandler(event){
    const {name,  value} = event.target
    this.setState({ [name]: value})
  }

  genHandler(event){
    event.preventDefault()
    const numMemes = this.state.allMemeImgs.length
    const randomMeme = Math.floor(Math.random() * numMemes)
    const randomMemeImg = this.state.allMemeImgs[randomMeme].url
    this.setState({randomImage: randomMemeImg})
  }

  render(){
    return(
        <div>
          <form className="meme-form" onSubmit = {this.genHandler}>
            <input
              type = "text"
              name = "topText"
              placeholder = "Top Text"
              value = {this.state.topText}
              onChange = {this.changeHandler}
            />
            <input
              type = "text"
              name = "bottomText"
              placeholder = "Bottom Text"
              value = {this.state.bottomText}
              onChange = {this.changeHandler}
            />
            <button>Gen</button>
          </form>
          <div className = "meme">
            <img src = {this.state.randomImage} alt=""/>
            <h2 className = "top">{this.state.topText}</h2>
            <h2 className = "bottom">{this.state.bottomText}</h2>
          </div>
        </div>
    )
  }
}

export default MemeGenerator
