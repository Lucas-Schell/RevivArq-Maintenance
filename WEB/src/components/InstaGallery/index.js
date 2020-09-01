import React, { Component } from 'react';
import { get } from 'services/instaGallery'
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';


const styles = theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
		backgroundColor: 'rgb(21,38,32)',
	},
	gridList: {
		flexWrap: 'nowrap',
		transform: 'translateZ(0)',
	},
	title: {
		color: theme.palette.primary.light,
	},
	titleBar: {
		background:
			'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
	},
});

class InstaGallery extends Component {

	constructor(props) {
		super(props)
		this.state = {
			fotos: []
		}
	}

	componentDidMount() {
		this.getGallery();
	}

	getGallery = async () => {
		var response = await get();
		var imagens = response.data;
		var aux = this.state.fotos;
		console.log(imagens)
		for (var i = 0; i < imagens.length; i++) {
			aux.push(imagens[i].images.standard_resolution.url);
		}
		this.setState({
			fotos: aux
		})
	}

	render() {
		const { classes } = this.props;
		const imgs = this.state.fotos;
		return (
			<div className={classes.root}>

				<GridList cellHeight={300} className={classes.gridList} cols={3}>
					{imgs.map(f => (
						<GridListTile key={f}>
							<img src={f} alt="insta foto" />

						</GridListTile>
					))}
				</GridList>

			</div>


		)
	}
}
export default withStyles(styles)(InstaGallery);