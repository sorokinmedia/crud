import React from 'react'
import { Spin, Icon } from 'antd';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin theme={'outlined'} />;
const Loader = () => <Spin indicator={antIcon}/>;

export default Loader
