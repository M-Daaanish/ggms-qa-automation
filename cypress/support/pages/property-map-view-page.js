class MapPage {


// Get map section 

mapView() {
    return cy.get('.searchresult__map');
}

drawMode() {
    return cy.get('#toggle-free-draw');
}

propertyMarkers() {
    return cy.get('gmp-advanced-marker');
  }

boundaryPolygon() {
    return cy.get('.gm-style .leaflet-interactive, .gm-style-polygon, path');
  } 

}

export default MapPage