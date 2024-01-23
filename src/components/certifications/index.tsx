import * as React from "react";
import "../../styles/certif.styles.css";
import Image from "next/image";

interface CertifProps {
  iref: React.Ref<any>;
  name: string;
}

const Certifications: React.FC<CertifProps> = ({ iref, name }) => {
  return (
    <div ref={iref} className="cert-template">
      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="frame">
            <div className="text-wrapper">SAMSAT Rembang</div>
            <div className="div">
              <div className="frame-2">
                <div className="frame-3">
                  <div className="text-wrapper-2">
                    CERTIFICATE OF APPRECIATION
                  </div>
                  <p className="p">This Certificate is proudly presented to</p>
                </div>
                <div className="frame-4">
                  <div className="text-wrapper-3">{name}</div>
                  <p className="text-wrapper-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Tellus nulla tellus, vitae vitae amet fusce. Nam nec aliquet
                    nunc vitae eget mattis. Sem nec ut nisi, et malesuada
                    sapien. Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit.
                  </p>
                </div>
              </div>
              <div className="frame-5">
                <div className="frame-6">
                  <div className="text-wrapper-5">James Smith</div>
                  <div className="frame-7">
                    <div className="text-wrapper-6">James Smith</div>
                    <div className="text-wrapper-7">President</div>
                  </div>
                </div>
                <div className="frame-6">
                  <div className="text-wrapper-5">Janathan Harrie</div>
                  <div className="frame-7">
                    <div className="text-wrapper-6">Janathan Harrie</div>
                    <div className="text-wrapper-7">Director</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Image
            className="group-2"
            alt="Group"
            src="/certif-bot.png"
            width={200}
            height={200}
          />
          <Image
            className="group-3"
            alt="Group"
            src="/certif-top.png"
            width={200}
            height={200}
          />
        </div>
      </div>
    </div>
  );
};

export default Certifications;
