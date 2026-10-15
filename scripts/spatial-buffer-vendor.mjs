import {buffer} from '@turf/buffer';
import GeoJSONReader from 'jsts/org/locationtech/jts/io/GeoJSONReader.js';
import IsValidOp from 'jsts/org/locationtech/jts/operation/valid/IsValidOp.js';
export {buffer};
export function valid(geometry){try{return new IsValidOp(new GeoJSONReader().read(geometry)).isValid();}catch{return false;}}
