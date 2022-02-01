import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

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

        this.map.once('load', () => {
            //Add source
            this.map.addSource('geo_data',{
                type: 'geojson',
                data: {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "marker-color": "#b13e3e",
        "marker-size": "medium",
        "marker-symbol": "swimming",
        "name": "Swim point at Mendota"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -89.43231582641602,
          43.118527772544255
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "stroke": "#248f36",
        "stroke-width": 2,
        "stroke-opacity": 1,
        "name": "Line1"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            -89.43729400634766,
            43.11865307514252
          ],
          [
            -89.4477653503418,
            43.10812676239141
          ],
          [
            -89.47162628173828,
            43.10524424196997
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "stroke": "#555555",
        "stroke-width": 2,
        "stroke-opacity": 1,
        "fill": "#0f5bd7",
        "fill-opacity": 0.5,
        "name": "poly1"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -89.47308540344238,
              43.10092020683161
            ],
            [
              -89.47480201721191,
              43.09540505222241
            ],
            [
              -89.47248458862305,
              43.091268360273304
            ],
            [
              -89.46802139282227,
              43.085815021237
            ],
            [
              -89.46252822875975,
              43.08437325276197
            ],
            [
              -89.4536018371582,
              43.08926259086882
            ],
            [
              -89.47308540344238,
              43.10092020683161
            ]
          ]
        ]
      }
    }
  ]
}
            });

            //Add symbol layer
            this.map.addLayer({
                'id': ['get','$name'],
                'type': 'symbol',
                'source': 'geo_data',
                'layout': {
                    'icon-image': [
                        'coalesce',
                        ['image',['get','marker-symbol']],
                        ['image','rocket-15']
                    ],
    
                    'icon-size':[
                        ['has','$marker-size'],
                            ['==',[['get','$marker-size'],'small'],10],
                            ['==',[['get','$marker-size'],'medium'],20],
                            ['==',[['get','$marker-size'],'large'],30],
                    10],
                    'visibility':'visible'
                },
                'paint': {
                    'icon-color':['get','$marker-color']
                },
                'filter': ['==', '$type', 'Point']
            });
    
            //Add line layer
            this.map.addLayer({
                'id': ['get','$name'],
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
                'id': ['concat',['string',['get','$name']],'-fill'],
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
                'id': ['concat',['get','$name'],'-outline'],
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
