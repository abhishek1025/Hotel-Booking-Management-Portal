import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from '@material-tailwind/react';

import { useState } from 'react';
import { formatImageUrl } from '../../../utils';

const RoomDesDialog = ({ description = '', amenities = [], images = [] }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        View Desc
      </Button>
      <Dialog open={open} handler={handleOpen} size="lg">
        <DialogHeader>Room Details</DialogHeader>
        <DialogBody className="text-black h-[500px] overflow-scroll">
          <div>
            <h3 className="font-bold text-lg mb-2">Description:</h3>
            <p>{description}</p>
          </div>
          <div className="mt-4 flex">
            <div className="pr-4 w-full">
              <h3 className="font-bold text-lg mb-2">Amenities:</h3>
              <div className="flex flex-wrap gap-3">
                {amenities.length > 0 ? (
                  amenities.map((amenity) => (
                    <div
                      key={Math.random() * amenity.length}
                      className="bg-gray-200 px-2 py-1 rounded-md"
                    >
                      {amenity}
                    </div>
                  ))
                ) : (
                  <p>No amenities listed.</p>
                )}
              </div>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-bold text-lg mb-2">Images:</h3>
            <div className="flex gap-4 flex-wrap">
              {images.length > 0 ? (
                images.map((image, index) => (
                  <img
                    key={index}
                    src={formatImageUrl(image)}
                    alt={`Room image ${index + 1}`}
                    className="w-32 h-32 object-cover"
                  />
                ))
              ) : (
                <p>No images available.</p>
              )}
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" color="red" onClick={handleOpen}>
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default RoomDesDialog;
