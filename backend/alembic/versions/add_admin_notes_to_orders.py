"""Add admin_notes and updated_at to orders table

Revision ID: add_admin_notes_to_orders
Revises: bdf2b46889b4
Create Date: 2025-11-30 10:00:00.000000

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'add_admin_notes_to_orders'
down_revision = 'bdf2b46889b4'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Add updated_at column
    op.add_column('orders', sa.Column('updated_at', sa.DateTime(), nullable=True))
    
    # Add admin_notes column
    op.add_column('orders', sa.Column('admin_notes', sa.Text(), nullable=True))


def downgrade() -> None:
    op.drop_column('orders', 'admin_notes')
    op.drop_column('orders', 'updated_at')
