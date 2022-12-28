import React, { useState } from 'react';
import { Button, Modal } from 'antd';

const ModalPop = ({ deleteProduct, id }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
		deleteProduct(id);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<Button type="primary" onClick={showModal}>
				Delete
			</Button>
			<Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}></Modal>
		</>
	);
};

export default ModalPop;
