import React,{ Component} from 'react';
import cx from 'classnames';
import './styles/file.scss';

export default class File extends Component{

  constructor(props){
    super(props);
    console.log(props);
    this.state = {
      loaded:false,
      active: false,
      image:null,
    }
    this.fileInputChanged = this.fileInputChanged.bind(this);
    this.onDragEnter  = this.onDragEnter.bind(this);
    this.onDragLeave  = this.onDragLeave.bind(this);
    this.onDrop       = this.onDrop.bind(this);

  }

  onDragEnter(e) {
        this.setState({ active: true });
    }
    
    onDragLeave(e) {
        this.setState({ active: false });
    }
    
    onDragOver(e) { 
        e.preventDefault();
    }
    
    onDrop(e) {
        e.preventDefault();
        this.setState({ active: false });
        this.fileInputChanged(e, e.dataTransfer.files[0]);
    }


  fileInputChanged(e,file){
    var file = file ||  e.target.files[0],
        pattern = (this.props.accept == 'image' )? /image-*/ :'', 
        reader = new FileReader();

        if (!file.type.match(pattern)) {
            alert('Invalid file');
            return;
        }
        this.props.file(file);
        this.setState({ loaded: false });

         reader.onload = (e) => {
            this.setState({ 
                image: reader.result, 
                loaded: true 
            }); 
        }
        
        reader.readAsDataURL(file);

  }
  render(){

    let state = this.state;
    
    let type  = this.props.type,
    input  = this.props.input,
    touched = this.props.meta.touched,
    error = this.props.meta.error,
    helpText =this.props.helpText,
    disabled = this.props.disabled; 


    let labelclass = `uploader-file ${state.loaded && 'loaded'}`,
        borderColor = state.active ? '#800000' : 'grey'; 

    return(<label 
              className={labelclass}
              onDragEnter={this.onDragEnter}
              onDragLeave={this.onDragLeave} 
              onDragOver={this.onDragOver}
              onDrop={this.onDrop}
              style={{outlineColor: borderColor}}
           >
            <img src={state.image} className={state.loaded && 'loaded'}/>
            <input {...input}
                   className={ 'form-control'}
                   onChange ={this.fileInputChanged}
                   type='file'
                   />

           { touched && error &&
              <span className="error" htmlFor={input.name}>{error}</span>
            }

            { helpText &&
              <span className="help-block">{helpText}</span>
            }
      </label>);
  }
}

