ALTER TABLE egov_bulk_pdf_info add column tenantid character varying(50), add column locality character varying(50), add column businessservice character varying(50), add column consumercode character varying(50), add column isconsolidated BOOLEAN DEFAULT FALSE;