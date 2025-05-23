import { CSSProperties, SVGProps } from 'react';
interface SvgComponentProps extends SVGProps<SVGSVGElement> {
  style?: CSSProperties;
}

const SvgComponent = ({ style, ...props }: SvgComponentProps) => (
  <svg
    style={style}
    width="48"
    height="27"
    viewBox="0 0 56 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_1002_15381)">
      <path
        d="M52.9637 11.8394L56 7.62659H39.252L37.8355 9.62302L36.209 11.8361H37.8355V16.3189C37.0156 14.9391 34.8225 14.1291 32.3128 14.0392L29.9131 17.3488H31.7829C32.9761 17.3488 33.5127 17.6887 33.5127 18.5186C33.5127 19.3485 32.9761 19.7118 31.7829 19.7118H14.7583L11.5153 23.9046H31.393C34.8959 23.9046 36.9323 22.9114 37.8322 21.1583V23.8247H42.8682V17.892H48.5909L51.4372 13.9458H42.8682V11.8394H52.9571H52.9637Z"
        fill="#EE224F"
      />
      <path
        d="M27.0434 17.3489L29.3932 14.1093H28.9665L26.6168 17.3489H27.0434Z"
        fill="#808184"
      />
      <path
        d="M27.7434 17.3489L30.0931 14.1093H29.6631L27.3134 17.3489H27.7434Z"
        fill="#808184"
      />
      <path
        d="M28.4333 17.3489L30.783 14.1093H30.3564L28.0067 17.3489H28.4333Z"
        fill="#808184"
      />
      <path
        d="M23.4039 11.8395H34.8725L37.9555 7.59998H23.7938C20.4509 7.59998 18.4311 8.5132 17.4746 10.053C15.7748 8.73317 13.4217 7.96327 10.6954 7.96327H2.99631L0 12.1194H10.6954C13.3684 12.1194 15.4215 13.7659 15.4215 16.0123C15.4215 18.2587 13.4384 19.8319 10.6954 19.8319H4.96608V13.9825H0V23.938H10.6954C15.7348 23.938 19.5677 21.0317 20.2176 17.0222C20.9808 17.2355 21.8774 17.3521 22.9139 17.3521H26.3469L28.7099 14.1092H23.4005C22.2307 14.1092 21.6708 13.7926 21.6708 12.9627C21.6708 12.1328 22.2307 11.8428 23.4005 11.8428L23.4039 11.8395Z"
        fill="#808184"
      />
    </g>
    <defs>
      <clipPath id="clip0_1002_15381">
        <rect
          width="56"
          height="16.3347"
          fill="white"
          transform="translate(0 7.59998)"
        />
      </clipPath>
    </defs>
  </svg>
);

export default SvgComponent;
