var connect = require('react-redux').connect;
import React, { Component } from 'react';
import store from '../store';
import actions from '../actions';
import {  } from 'react-bootstrap';
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';


export class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { address: 'San Francisco, CA' };
    this.onChange = (address) => this.setState({ address });
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  componentDidMount() {

      var map, places,infoWindow;
      var markers = [];
      var autocomplete;
      var countryRestrict = {'country': 'us'};
      var MARKER_PATH = 'https://developers.google.com/maps/documentation/javascript/images/marker_green';
      var hostnameRegexp = new RegExp('^https?://.+?/');
      var infoWindowContent = '';

     map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 32.7157, lng: -117.1611},
          zoom: 13,
          mapTypeControl: false,
          panControl: false,
          zoomControl: false,
          streetViewControl: false
        });

         infoWindow = new google.maps.InfoWindow({
          content: document.getElementById('info-content')
        });

        var input = (
            document.getElementById('pac-input')
            );

        var options = {
             types: ['(cities)'],
             componentRestrictions: {country: 'us'}
        };    
        
        var types = document.getElementById('type-selector');
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        //map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);

        console.log("Input : ",input);
       
        var autocomplete = new google.maps.places.Autocomplete(document.getElementById('pac-input'),options);
        //autocomplete.bindTo('bounds', map);
        autocomplete.setOptions({strictBounds: true});
        places = new google.maps.places.PlacesService(map);

        //var infowindow = new google.maps.InfoWindow();
        var marker = new google.maps.Marker({
          map: map,
          anchorPoint: new google.maps.Point(0, -29)
        });

        autocomplete.addListener('place_changed', function() {
          //infowindow.close();
          marker.setVisible(false);
          var place = autocomplete.getPlace();
          console.log("Placess : ",place);
          if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
          }

          // If the place has a geometry, then present it on a map.

          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);  // Why 17? Because it looks good.
          }

          var search = {
              bounds: map.getBounds(),
              types: ['restaurant']
          };

          places.nearbySearch(search, function(results, status) {
           if (status === google.maps.places.PlacesServiceStatus.OK) {
            //Clear markers
              
              for (var i = 0; i < markers.length; i++) {
                if (markers[i]) {
                  markers[i].setMap(null);
                }
              }
            // Create a marker for each hotel found, and
            // assign a letter of the alphabetic to each marker icon.
            for (var i = 0; i < results.length; i++) {

              var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
              var markerIcon = MARKER_PATH + markerLetter + '.png';
              // Use marker animation to drop the icons incrementally on the map.
              markers[i] = new google.maps.Marker({
                position: results[i].geometry.location,
                animation: google.maps.Animation.DROP,
                icon: markerIcon
              });
              // If the user clicks a hotel marker, show the details of that hotel
              // in an info window.
              markers[i].placeResult = results[i];
              google.maps.event.addListener(markers[i], 'click', function() {
                  var marker = this;
                  places.getDetails({placeId: marker.placeResult.place_id},function(place, status) {
                        if (status !== google.maps.places.PlacesServiceStatus.OK) {
                          return;
                        }
                          var address = '';
                          if (place.address_components) {
                            address = [
                              (place.address_components[0] && place.address_components[0].short_name || ''),
                              (place.address_components[1] && place.address_components[1].short_name || ''),
                              (place.address_components[2] && place.address_components[2].short_name || '')
                            ].join(' ');
                          }

                        infoWindow.open(map, marker);
                        document.getElementById('info-content').innerHTML = '<b>Place Name :</b> '+place.name+'<br><b>Address :</b> '+address+'<br><br><a href="#/survey/'+place.place_id+'?name='+place.name+'&address='+place.formatted_address+'">Take Survey</a>';
                      });
              });
              setTimeout(markers[i].setMap(map), i * 100);
              //addResult(results[i], i);
            }
          }
          });
         //========================================================
          
          /**if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);  // Why 17? Because it looks good.
          }
          marker.setIcon(({
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35)
          }));
          marker.setPosition(place.geometry.location);
          marker.setVisible(true);

          var address = '';
          if (place.address_components) {
            address = [
              (place.address_components[0] && place.address_components[0].short_name || ''),
              (place.address_components[1] && place.address_components[1].short_name || ''),
              (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
          }
          var content = `<div><strong> ${place.name} </strong><br> ${address}
                         <br><a href="#/survey/${place.place_id}?name=${place.name}&address=${place.formatted_address}">Take Survey</a></div>`;
                        console.log(place);
          infowindow.setContent(content);
          infowindow.open(map, marker);*/
        });
  }

  
 // Load the place information into the HTML elements used by the info window.
   buildIWContent(place) {
        document.getElementById('iw-icon').innerHTML = '<img class="hotelIcon" ' +
            'src="' + place.icon + '"/>';
        document.getElementById('iw-url').innerHTML = '<b><a href="' + place.url +
            '">' + place.name + '</a></b>';
        document.getElementById('iw-address').textContent = place.vicinity;

        if (place.formatted_phone_number) {
          document.getElementById('iw-phone-row').style.display = '';
          document.getElementById('iw-phone').textContent =
              place.formatted_phone_number;
        } else {
          document.getElementById('iw-phone-row').style.display = 'none';
        }

        // Assign a five-star rating to the hotel, using a black star ('&#10029;')
        // to indicate the rating the hotel has earned, and a white star ('&#10025;')
        // for the rating points not achieved.
        if (place.rating) {
          var ratingHtml = '';
          for (var i = 0; i < 5; i++) {
            if (place.rating < (i + 0.5)) {
              ratingHtml += '&#10025;';
            } else {
              ratingHtml += '&#10029;';
            }
          document.getElementById('iw-rating-row').style.display = '';
          document.getElementById('iw-rating').innerHTML = ratingHtml;
          }
        } else {
          document.getElementById('iw-rating-row').style.display = 'none';
        }

        // The regexp isolates the first part of the URL (domain plus subdomain)
        // to give a short URL for displaying in the info window.
        if (place.website) {
          var fullUrl = place.website;
          var website = hostnameRegexp.exec(place.website);
          if (website === null) {
            website = 'http://' + place.website + '/';
            fullUrl = website;
          }
          document.getElementById('iw-website-row').style.display = '';
          document.getElementById('iw-website').textContent = website;
        } else {
          document.getElementById('iw-website-row').style.display = 'none';
        }
      }


 clearResults() {
        var results = document.getElementById('results');
        while (results.childNodes[0]) {
          results.removeChild(results.childNodes[0]);
        }
      }

 clearMarkers() {
        for (var i = 0; i < markers.length; i++) {
          if (markers[i]) {
            markers[i].setMap(null);
          }
        }
        markers = [];
      }



  handleFormSubmit(event) {
    event.preventDefault()
    const { address } = this.state

    geocodeByAddress(address,  (err, data) => {
      console.log(data);
      if (err) {
        console.log('Oh no!', err);
      }

      console.log(`Yay! got latitude and longitude for ${address}`, data)
    });
  }

  render() {
    return (
      <div>
        <input id="pac-input" className="controls" type="text"
        placeholder="Enter a location" />
        <div id="type-selector" className="controls">
        </div>

        <div id="map"></div>
        <div id="info-content"></div>
      </div>
    )
  }
};

var mapStateToProps = function(state, props) {
    return {
        error: state.error
    };
};

var Container = connect(mapStateToProps)(Search);

export default Container;
