import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import ModalPop from './Modal';
import ModalUpdate from './ModalUpdate';

function ProductsTable() {
	const [products, setproducts] = useState([]);
	const [loading, setloading] = useState(false);
	const [updatedProduct, setUpdatedProduct] = useState({ customerId: '', orderDate: '', shipVia: '' });

	useEffect(() => {
		getProducts();
	}, []);

	const getProducts = () => {
		fetch('https://northwind.vercel.app/api/orders')
			.then((res) => res.json())
			.then((data) => {
				setproducts(data);
				setloading(false);
			});
	};

	const deleteProduct = (id) => {
		fetch(`https://northwind.vercel.app/api/orders/${id}`, { method: 'DELETE' }).then((res) => {
			if (res.status === 200) getProducts();
		});
	};

	const updateProductFunc = (id) => {
		fetch(`https://northwind.vercel.app/api/orders/${id}`, {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updatedProduct),
		}).then((result) => {
			result.json().then((data) => {
				getProducts();
			});
		});
	};

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		setUpdatedProduct({
			...updatedProduct,
			[name]: value,
		});
	};

	let columns = [
		{
			title: 'ID',
			dataIndex: 'id',
		},
		{
			title: 'customerId',
			dataIndex: 'customerId',
		},
		{
			title: 'orderDate',
			dataIndex: 'orderDate',
			sorter: (a, b) => {
				if (a.orderDate > b.orderDate) {
					return -1;
				}
				if (a.orderDate < b.orderDate) {
					return 1;
				}
				return 0;
			},
		},
		{
			title: 'shipVia',
			dataIndex: 'shipVia',
			sorter: (a, b) => `${a.shipVia}`.localeCompare(`${b.shipVia}`),
		},
		{
			title: 'Delete',
			dataIndex: 'id',
			render: (id) => <ModalPop id={id} deleteProduct={deleteProduct} />,
		},
		{
			title: 'Uptade',
			dataIndex: 'id',
			render: (id) => (
				<ModalUpdate
					handleChange={handleChange}
					id={id}
					updateProductFunc={updateProductFunc}
					updatedProduct={updatedProduct}
				/>
			),
		},
	];

	return (
		<>
			<Table
				rowKey={(record) => record.id}
				dataSource={products}
				columns={columns}
				pagination={{ pageSize: 5 }}
				loading={loading}
			/>
		</>
	);
}

export default ProductsTable;
