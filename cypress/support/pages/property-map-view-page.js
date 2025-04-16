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
    return cy.get('.gm-style path, .gm-style-polygon, .leaflet-interactive');
  }

}

export default MapPage