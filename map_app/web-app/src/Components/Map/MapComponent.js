import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl'

const accessToken = 'pk.eyJ1IjoibGVvbmJlY2tlcmlzaGVyZSIsImEiOiJja3oyM3VtYzMxcXJ6Mnp0YjFtazJob2l6In0.Bf4fBUDmV2_mJg2re69WAQ';
const styleName = 'mapbox/streets-v11';
const longitude = 43.0731
const latitude = -89.4012
const zoomScale = 10

export class MapComponent extends Component {
    constructor(props){
        super(props);
        this.setState({mapIsLoaded: false});
    }


    componentDidMount() {

        mapboxgl.accessToken = accessToken;

        //initialize the map
        this.map = new mapboxgl.Map({
            container: 'map',
            style: `mapbox://styles/${styleName}`,
            center: [longitude,latitude],
            zoom: [zoomScale],
        });

        this.map.on('load', () => {
            //Add source
            this.map.addSource('geo_data',{
                type: 'geojson',
                data: {}
            });

            //Add symbol layer
            this.map.addLayer({
                'id': ['get','name'],
                'type': 'symbol',
                'source': 'geo_data',
                'layout': {
                    'icon-image': [
                        'coalesce',
                        ['image',['get','marker-symbol']],
                        ['image','rocket-15']
                    ],
    
                    'icon-size':[
                        ['has','marker-size'],
                            ['==',[['get','marker-size'],'small'],10],
                            ['==',[['get','marker-size'],'medium'],20],
                            ['==',[['get','marker-size'],'large'],30],
                    10],
                    'visibility':'visible'
                },
                'paint': {
                    'icon-color':['get','marker-color']
                },
                'filter': ['==', '$type', 'Point']
            });
    
            //Add line layer
            this.map.addLayer({
                'id': ['get','name'],
                'type': 'line',
                'source': 'geo_data',
                'layout':{
                    'visibility':'visible'
                },
                'paint': {
                    'line-color':['get','stroke'],
                    'line-opacity':['get','stroke-opacity'],
                    'line-width':['get','stroke-width']
                },
                'filter': ['==', '$type', 'LineString']
            });
    
            //Add polygon layers
                //Add polygon fill layer
            this.map.addLayer({
                'id': ['concat',['get','name'],'-fill'],
                'type': 'fill',
                'source': 'geo_data',
                'layout':{
                    'visibility':'visible'
                },
                'paint': {
                    'fill-color':['get','fill'],
                    'fill-opacity':['get','fill-opacity']
                },
                'filter': ['==', '$type', 'Polygon']
            });
                //Add polygon outline layer
            this.map.addLayer({
                'id': ['concat',['get','name'],'-outline'],
                'type': 'line',
                'source': 'geo_data',
                'layout':{
                    'visibility':'visible'
                },
                'paint': {
                    'line-color':['get','stroke'],
                    'line-opacity':['get','stroke-opacity'],
                    'line-width':['get','stroke-width']
                },
                'filter': ['==', '$type', 'Polygon']
            });
    
            this.setState({mapIsLoaded: true});
        });
    }

    render(){
        return(<div id='map' />  )
    }

    componentDidUpdate(prevProps){
        const { mapIsLoaded } = this.state;
        
        if (!mapIsLoaded) return;

        //Update geo_data
        if(this.props.data !== prevProps.data){
          this.map.getSource('geo_data').setData(this.props.data);
        }
    }
}
