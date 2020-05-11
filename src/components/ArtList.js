
import artworkList from '../artwork/artwork-list.json';



class ArtList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            artworkList: artworkList
        }

    }

    componentDidMount() {

    }

    renderTiles() {
        return artworkList.twoDimensional.map(artwork => {
        });
    }
    
    render() {
        return (
            this.renderTiles()
        )
    }
}

export default ArtList;