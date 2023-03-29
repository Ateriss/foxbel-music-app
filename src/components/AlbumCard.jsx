// Components
import { ArrowRight2 } from "iconsax-react";
import PerfectSquare from "./PerfectSquare";

const AlbumCard = ({ img, title, author, album, onClick }) => {
  return (
    <div
      className="cursor-pointer text-white mr-4 inline-block w-40 h-40 md:w-48 md:h-48"
      onClick={onClick}
    >
      <PerfectSquare>
        <img className="w-full" src={img} alt="album-cover" />
        <div className="absolute inset-0 text-white flex items-center justify-center">
          <ArrowRight2 variant="Bold" size={64} />
        </div>
      </PerfectSquare>

      <p className="text-md mt-3 overflow-hidden">{title}</p>
      <p className="text-xs text-gray-400 overflow-hidden">
        {author} - {album}
      </p>
    </div>
  );
};

export default AlbumCard;
