Q: Briefly describe a key Azure data platform you've built. What was the architecture, your direct role, and a critical technical trade-off you made?

A:
    - Architecture: Azure Data Lake Storage Gen2 (ADLS) for raw storage, Azure Data Factory and Apache Airflow for ingestion, Azure Databricks (PySpark / Delta Lake) and dbt for Medallion architecture transformations (Bronze to Silver to Gold), and Azure Synapse / Power BI for analytical serving.
    - Direct Role: Lead Data Platform Architect and Engineer. Designed Infrastructure as Code (Terraform), pipeline ingestion frameworks, dbt transformation layers, and Databricks cluster management.
    - Technical Trade off: Opted for Databricks with Delta Lake over native Azure Synapse SQL pools for heavy ETL/ELT transformations. While this introduced cluster spin-up latency, it significantly reduced computing costs for high-volume semi-structured data, provided superior PySpark parallel processing, and guaranteed ACID compliance via Delta Lake logs.

Q: How do you structure your dbt projects and data models? Please share a real-world example of a transformation challenge you solved using dbt.

A:
    Project Structure: Standardized Medallion / multi-layer design:
    1.  staging/: Clean 1:1 source mappings, explicit casting, and column renaming.
    2.  intermediate/: Business logic, complex joins, episode aggregation, and stateful transformations.
    3.  marts/: Star-schema dimensional models (dim_ and fct_) optimized for BI and downstream analytics.Transformation Challenge: Handling high-volume, late-arriving event logs and duplicate records without performing costly full table scans.
    Solution: Implemented incremental dbt models with dynamic unique_key definitions combined with windowing functions (row_number() over partition by id order by updated_at desc) and dbt snapshots. This cut warehouse compute costs by over 40% while ensuring complete pipeline idempotency.

Q: Describe a recent project using Databricks. What was the workload type and how did you approach performance or cost optimization?

A:
    Workload Type: Large-scale PySpark ETL batch and near-real-time streaming pipelines for processing multi-terabyte log and financial event datasets into Delta Lake tables.Performance & Cost Optimization:
    1.  File Layout & Data Skipping: Executed periodic OPTIMIZE and ZORDER BY routines on key join/filter keys to solve the small file problem and enable efficient predicate pushdowns.
    2.  Cluster Cost Control: Implemented strict auto-scaling policies with auto-termination (15-minute idle) and leveraged Spot instances for non-critical worker nodes.
    3.  Memory & Join Tuning: Employed broadcast joins for smaller dimension lookups to avoid expensive cross-node shuffles, optimizing PySpark execution times.

Q: How have you used Airflow to orchestrate complex workflows? Highlight a recent setup.

A:
    Setup: Managed Airflow / MWAA orchestrating end-to-end data pipelines across ingestion, Databricks job runs, dbt data modeling, and automated data quality validation.Key Highlights:
    1.  Dynamic DAG Generation: Built Python config-driven DAG factories to onboard new endpoints and data sources dynamically without code repetition.
    2.  Modular Operators: Utilized DatabricksSubmitRunOperator, ADLS blob sensors, and KubernetesPodOperator for containerized execution.
    3.  Resiliency: Standardized SLA monitoring, automated retry policies with exponential backoffs, and instant Slack alert webhooks for failed tasks.

Q: Please describe how you integrate AI tools into your daily coding loop to save time.

A:
    Development & Refactoring: Use Claude Code and AI coding assistants directly in my local terminal and IDE for rapid boilerplate generation, PySpark/SQL optimization, and unit test generation.
    Workflow Automation: Build lightweight agentic scripts (using Pydantic AI) to automatically generate dbt schema.yml documentation, parse legacy SQL into modular dbt models, and triage pipeline error logs, reducing setup and debugging time by 30-40%.
