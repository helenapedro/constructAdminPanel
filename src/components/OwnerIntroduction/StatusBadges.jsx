import React from 'react';
import { FaEnvelope, FaFileAlt } from 'react-icons/fa';
import { SiWhatsapp } from 'react-icons/si';
import StatusBadge from './StatusBadge';
import config from '../../config';

const StatusBadges = () => {
     return (
          <div className="d-flex justify-content-center justify-content-md-center gap-2 overflow-auto">
               <StatusBadge Icon={FaEnvelope} href={`mailto:jose.pedro7@outlook.com`} />
               <StatusBadge Icon={SiWhatsapp} href={`https://wa.me/+244947462094`} />
               <StatusBadge Icon={FaFileAlt} href={config.resumeUrl} />
          </div>
     );
};

export default StatusBadges;