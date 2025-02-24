import { BadgeType } from '@/types/common';
import {
  FaCrown,
  FaBug,
  FaRocket,
  FaCode,
  FaStar,
  FaHeart,
  FaShieldAlt,
  FaHandshake,
} from 'react-icons/fa';

export const getBadgeIcon = (badge: BadgeType) => {
  switch (badge) {
    case 'STAFF':
      return <FaShieldAlt className="text-[#5865F2]" />;
    case 'PARTNER':
      return <FaHandshake className="text-[#5865F2]" />;
    case 'HYPESQUAD':
      return <FaCrown className="text-[#FBB848]" />;
    case 'BUG_HUNTER':
      return <FaBug className="text-[#FF7043]" />;
    case 'NITRO':
      return <FaRocket className="text-[#FF73FA]" />;
    case 'BOOST':
      return <FaHeart className="text-[#FF73FA]" />;
    case 'DEVELOPER':
      return <FaCode className="text-[#5865F2]" />;
    case 'EARLY_SUPPORTER':
      return <FaStar className="text-[#5865F2]" />;
    default:
      return null;
  }
}; 