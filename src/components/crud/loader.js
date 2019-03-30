import React from 'react'
import { Spin, Icon } from 'antd';

const antIcon = <Icon type="loading" style={{ fontSize: 36 }} spin />;
const Loader = () => (
	<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
		<Spin
			//indicator={antIcon}
		/>
	</div>
);

export default Loader
