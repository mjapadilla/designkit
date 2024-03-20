import axios from 'axios';
import { get, isEmpty } from 'lodash';

import { toast } from 'ui/toast';

const padBounds = (bounds: number[], padding = 0.2) => {
  const x1 = bounds[0];
  const y1 = bounds[1];
  const x2 = bounds[2];
  const y2 = bounds[3];

  // const x_center = (((x1 + x2) - x1) / 2) + x1;
  // const y_center = (((y1 + y2) - y1) / 2) + y1;
  // const w_padded = (x2 - x1) * padding;
  // const h_padded = (y2 - y1) * padding;
  // const size = w_padded > h_padded ? w_padded : h_padded;

  // const new_x1 = Math.floor(x_center - (size / 2));
  // const new_y1 = Math.floor(y_center - (size / 2));
  // const new_x2 = Math.floor(x_center + (size / 2)) - new_x1;
  // const new_y2 = Math.floor(y_center + (size / 2)) - new_y1;

  const new_x1 = Math.floor(x1 - x2 * padding);
  const new_y1 = Math.floor(y1 - y2 * padding);
  const new_x2 = Math.floor(x2 + x2 * padding * 2);
  const new_y2 = Math.floor(y2 + y2 * padding * 2);

  return {
    x: new_x1,
    y: new_y1,
    w: new_x2,
    h: new_y2,
  };
};

export const autoCropFace = async (ucare_url: string) => {
  try {
    const res = await axios.get(`${ucare_url}detect_faces/`);
    const face = get(res, 'data.faces.0') || [];
    if (isEmpty(face)) {
      toast.warning('Unable to crop automatically. No face detected.');
      return ucare_url;
    }

    const { x, y, w, h } = padBounds(face);
    return `${ucare_url}-/crop/${w}x${h}/${x},${y}/-/preview/`;
  } catch (err) {
    toast.warning('Unable to crop automatically. Crop error!');
    return ucare_url;
  }
};
