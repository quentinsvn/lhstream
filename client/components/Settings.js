import React from 'react';
import axios from 'axios';

export default class Navbar extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            stream_key : ''
        };

        this.generateStreamKey = this.generateStreamKey.bind(this);
    }

    componentDidMount() {
        this.getStreamKey();
    }

    generateStreamKey(e){
        axios.post('/settings/stream_key')
            .then(res => {
                this.setState({
                    stream_key : res.data.stream_key
                });
            })
    }

    getStreamKey(){
        axios.get('/settings/stream_key')
            .then(res => {
                this.setState({
                    stream_key : res.data.stream_key
                });
            })
    }

    render() {
        return (
            <React.Fragment>
                <div className="container mt-5">
                    <h4>Clé privée</h4>
                    <hr className="my-4"/>

                    <div className="col-xs-12 col-sm-12 col-md-8 col-lg-6">
                        <div className="row">
                            <h5>{this.state.stream_key}</h5>
                        </div>
                        <div className="row">
                            <button
                                className="btn btn-dark mt-2"
                                onClick={this.generateStreamKey}>
                                Généré une clé privée
                            </button>
                        </div>
                    </div>
                </div>

                <div className="container mt-5">
                    <h4>Informations de connexion (RTMP)</h4>
                    <hr className="my-4"/>

                    <div className="col-12">
                        <div className="row">
                            <ul>
                                <li>URL : rtmp://lhstream.quentinsavean.fr:1935/live</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
