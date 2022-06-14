import nerd from './nerd.svg';
import communication from './user2.svg';
import leadership from './user3.svg';
import responsibility from './user4.svg';
import teamwork from './user5.svg';
import selfMotivation from './user6.svg';
import timeManagement from './user7.svg';

export {
	nerd,
	communication,
	leadership,
	responsibility,
	teamwork,
	selfMotivation,
	timeManagement
};

const dict = {
	nerd,
	communication,
	leadership,
	responsibility,
	teamwork,
	selfMotivation,
	timeManagement
};

const avatars = Object.keys(dict).map((k) => ({
	key: k,
	id: k,
	src: dict[k]
}));

export default avatars;
