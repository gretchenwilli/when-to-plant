

import * as React from "react";


class PlantForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: '',
        imgURL : ""};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }
    getPhotos(value) {
        let photosUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=4dd2479d98c250c84c6075528a3292ca&user_id=61021753%40N02&text=' + value + '&format=json&nojsoncallback=1';

        fetch(photosUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.photos.photo.length !== 0) {
                        this.getPhotoUrl(result.photos.photo[0].id);
                    }
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }
    getPhotoUrl(photoId) {
        let photoIdURL = 'https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=4dd2479d98c250c84c6075528a3292ca&photo_id=' + photoId + '&format=json&nojsoncallback=1'
        fetch(photoIdURL)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result.sizes.size[5].source);
                    this.setState({imgURL:result.sizes.size[5].source})
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    handleSubmit(event) {
        //  'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=4dd2479d98c250c84c6075528a3292ca&user_id=61021753%40N02&text=Helianthus&format=json&nojsoncallback=1&auth_token=72157698694618142-ee6b6288d91212c5&api_sig=901a7233367e76f431fb2d066d1dcdad'

        // 'https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=4dd2479d98c250c84c6075528a3292ca&photo_id=35399230646&format=json&nojsoncallback=1&auth_token=72157698694618142-ee6b6288d91212c5&api_sig=b7bdc74a8594819f6121cdc3ca671578'
        this.getPhotos(this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Search for a Plant:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
                <img src={this.state.imgURL}/>
            </form>
        );
    }
}

export default PlantForm;