import React, { useState } from 'react';
import { Button, Modal, Input, Form } from 'antd';

const ModalUpdate = ({ id, updatedProduct, handleChange, updateProductFunc }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
		updateProductFunc(id);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const MyFormItemContext = React.createContext([]);

	function toArr(str) {
		return Array.isArray(str) ? str : [str];
	}

	const MyFormItemGroup = ({ prefix, children }) => {
		const prefixPath = React.useContext(MyFormItemContext);
		const concatPath = React.useMemo(() => [...prefixPath, ...toArr(prefix)], [prefixPath, prefix]);

		return <MyFormItemContext.Provider value={concatPath}>{children}</MyFormItemContext.Provider>;
	};

	const MyFormItem = ({ name, ...props }) => {
		const prefixPath = React.useContext(MyFormItemContext);
		const concatName = name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;

		return <Form.Item name={concatName} {...props} />;
	};

	return (
		<>
			<Button type="primary" onClick={showModal}>
				Update
			</Button>
			<Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
				<Form name="form_item_path" layout="vertical">
					<MyFormItemGroup prefix={['user']}>
						<MyFormItemGroup prefix={['name']}>
							<MyFormItem label="Customer Id">
								<Input name="customerId" value={updatedProduct.customerId} onChange={handleChange} />
							</MyFormItem>
							<MyFormItem label="Order Date">
								<Input name="orderDate" value={updatedProduct.orderDate} onChange={handleChange} />
							</MyFormItem>
						</MyFormItemGroup>
						<MyFormItem label="ship Via">
							<Input name="shipVia" value={updatedProduct.shipVia} onChange={handleChange} />
						</MyFormItem>
					</MyFormItemGroup>
				</Form>
			</Modal>
		</>
	);
};

export default ModalUpdate;
