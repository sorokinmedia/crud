export default {
	data: {
		"items": [{
			"id": 5,
			"name": "Иное",
			"is_deleted": "Нет",
			"actions": [{
				"id": "update",
				"icon": "fa fa-pencil-square-o",
				"name": "Изменить",
				"type": "query",
				"method": "POST",
				"url": "/v1/admin/object/property/type/5/update"
			}, {
				icon: "fa fa-reply",
				id: "restore",
				method: "POST",
				name: "Восстановить",
				type: "query",
				url: "/v1/admin/object/type/3/restore"
			}, {
				"id": "delete",
				"icon": "fa fa-trash",
				"name": "Удалить",
				"type": "query",
				"method": "POST",
				"url": "/v1/admin/object/property/type/5/delete"
			}]
		}, {
			"id": 4,
			"name": "Сантехника",
			"is_deleted": "Нет",
			"actions": [{
				"id": "update",
				"icon": "fa fa-pencil-square-o",
				"name": "Изменить",
				"type": "query",
				"method": "POST",
				"url": "/v1/admin/object/property/type/4/update"
			}, {
				"id": "delete",
				"icon": "fa fa-trash",
				"name": "Удалить",
				"type": "query",
				"method": "POST",
				"url": "/v1/admin/object/property/type/4/delete"
			}]
		}, {
			"id": 3,
			"name": "Ремонт",
			"is_deleted": "Нет",
			"actions": [{
				"id": "update",
				"icon": "fa fa-pencil-square-o",
				"name": "Изменить",
				"type": "query",
				"method": "POST",
				"url": "/v1/admin/object/property/type/3/update"
			}, {
				"id": "delete",
				"icon": "fa fa-trash",
				"name": "Удалить",
				"type": "query",
				"method": "POST",
				"url": "/v1/admin/object/property/type/3/delete"
			}]
		}, {
			"id": 2,
			"name": "Мебель",
			"is_deleted": "Нет",
			"actions": [{
				"id": "update",
				"icon": "fa fa-pencil-square-o",
				"name": "Изменить",
				"type": "query",
				"method": "POST",
				"url": "/v1/admin/object/property/type/2/update"
			}, {
				"id": "delete",
				"icon": "fa fa-trash",
				"name": "Удалить",
				"type": "query",
				"method": "POST",
				"url": "/v1/admin/object/property/type/2/delete"
			}]
		}, {
			"id": 1,
			"name": "Техника",
			"is_deleted": "Нет",
			"actions": [{
				"id": "update",
				"icon": "fa fa-pencil-square-o",
				"name": "Изменить",
				"type": "query",
				"method": "POST",
				"url": "/v1/admin/object/property/type/1/update"
			}, {
				"id": "delete",
				"icon": "fa fa-trash",
				"name": "Удалить",
				"type": "query",
				"method": "POST",
				"url": "/v1/admin/object/property/type/1/delete"
			}]
		}],
		"columns": [{
			"id": "id",
			"title": "ID",
			"type": "integer",
			"filter": {"can": true, "type": "input_number", "defaultValue": "", "query": ""},
			"order": {"can": true, "orders": ["SORT_ASC", "SORT_DESC"]}
		}, {
			"id": "name",
			"title": "Название",
			"type": "string",
			"filter": {"can": true, "type": "input_text", "defaultValue": "", "query": ""},
			"order": {"can": true, "orders": ["SORT_ASC", "SORT_DESC"]}
		}, {
			"id": "is_deleted",
			"title": "Удален",
			"type": "boolean",
			"filter": {"can": true, "type": "boolean", "defaultValue": "", "query": ""},
			"order": {"can": true, "orders": ["SORT_ASC", "SORT_DESC"]}
		}, {
			"id": "actions",
			"title": "Действия",
			"type": "actions",
			"filter": {"can": false, "type": "", "defaultValue": "", "query": ""},
			"order": {"can": false, "orders": []}
		}],
		"count": 5,
		"filter": {
			"id": null,
			"name": null,
			"is_deleted": null,
			"offset": 0,
			"limit": 100,
			"order_by": "id",
			"order": "SORT_DESC"
		}
	}, "status": 0, "messages": [{"type": 3, "message": "Данные получены", "targetField": null}]
};
